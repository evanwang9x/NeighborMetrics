from fastapi import FastAPI, HTTPException
from typing import Dict, Any, Optional
import os
import httpx
import logging
from config import settings

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(title="NeighborMetrics API")

# API keys
RAPIDAPI_KEY = "cd20af6242mshbe8f1f9cbaa32c5p163a78jsn979c1a07b30d"
CRIMEOMETER_KEY = os.getenv("CRIMEOMETER_KEY", "placeholder_key")
WALK_SCORE_KEY = os.getenv("WALK_SCORE_KEY", "placeholder_key")

@app.get("/")
def root():
    return {
        "name": "NeighborMetrics API",
        "status": "running",
        "version": "1.0.0"
    }

@app.get("/ping")
def ping():
    return {"status": "ok"}

@app.get("/housing")
async def get_housing_data(lat: float, lon: float, radius: Optional[int] = 0):
    """Get housing data for a location"""
    url = "https://realtor-search.p.rapidapi.com/property/search-sale"
    
    headers = {
        "x-rapidapi-key": settings.rapidapi_key,
        "x-rapidapi-host": settings.rapidapi_host
    }
    
    # Using the exact parameters from the RapidAPI interface
    params = {
        "location": "12746",
        "search_within_x_miles": "0",
        "sort_by": "RelevantListings",
        "property_type": "Condo",
        "listing_status": "NewConstruction",
        "days_on_realtor": "Today",
        "stories": "Single",
        "page": "1"
    }
    
    try:
        logger.info(f"Making request to {url} with params: {params}")
        logger.info(f"Using headers: {headers}")
        
        timeout = httpx.Timeout(10.0, connect=5.0)
        async with httpx.AsyncClient(timeout=timeout) as client:
            response = await client.get(
                url,
                headers=headers,
                params=params,
                follow_redirects=True
            )
            
            if response.status_code != 200:
                logger.error(f"API error: {response.status_code} - {response.text}")
                
            response.raise_for_status()
            data = response.json()
            
            # Process the response to return relevant housing metrics
            if isinstance(data, dict) and "data" in data:
                properties = data.get("data", {}).get("properties", [])
                if not properties:
                    return {
                        "score": 0,
                        "avg_price": 0,
                        "total_listings": 0,
                        "message": "No properties found in this area"
                    }
                
                # Calculate average price from available listings
                prices = [p.get("price", 0) for p in properties if p.get("price", 0) > 0]
                avg_price = sum(prices) / len(prices) if prices else 0
                total_listings = len(properties)
                
                # Normalize price to a 0-100 score (higher score for more affordable areas)
                # Assuming prices between $100k and $2M
                price_score = max(0, min(100, (2000000 - avg_price) / 19000))
                
                return {
                    "score": price_score,
                    "avg_price": avg_price,
                    "total_listings": total_listings,
                    "properties": properties[:5]  # Return first 5 properties for preview
                }
            else:
                raise HTTPException(status_code=500, detail="Unexpected API response format")
                
    except httpx.HTTPError as e:
        logger.error(f"HTTP error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching housing data: {str(e)}")
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

@app.get("/crime")
async def crime(lat: float, lon: float):
    """Get crime statistics for a location"""
    # For testing, return mock data
    return {
        "score": 82.3,
        "total_incidents": 156
    }

@app.get("/walk")
async def walk(lat: float, lon: float):
    """Get walk score for a location"""
    # For testing, return mock data
    return {
        "score": 88.0,
        "description": "Very Walkable"
    }

@app.get("/livability")
async def livability(lat: float, lon: float):
    """Get composite livability score"""
    # Get individual scores
    housing_data = await get_housing_data(lat, lon)
    crime_data = await crime(lat, lon)
    walk_data = await walk(lat, lon)
    
    # Calculate composite score (simple average)
    composite_score = (housing_data["score"] + crime_data["score"] + walk_data["score"]) / 3
    
    return {
        "composite_score": composite_score,
        "housing": housing_data,
        "crime": crime_data,
        "walk": walk_data
    } 