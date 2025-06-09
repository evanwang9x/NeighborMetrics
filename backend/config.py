from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    rapidapi_key: str = "cd20af6242mshbe8f1f9cbaa32c5p163a78jsn979c1a07b30d"
    rapidapi_host: str = "realtor-search.p.rapidapi.com"

settings = Settings() 