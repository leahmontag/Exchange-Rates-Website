from fastapi import APIRouter, HTTPException
from currencies import Currency
import requests


API_KEY = "9cae30c407268b2f2dd52d75"

router = APIRouter()


@router.get("/api/currencies")
def getCurrencies():
    result = [e.value for e in Currency]
    return result


@router.get("/api/exchange-rates/{base_currency}")
async def convert(base_currency: str):
    try:
        if base_currency not in Currency._value2member_map_:
            raise HTTPException(status_code=400, detail="Invalid base currency")
        
        API_URL = f"https://v6.exchangerate-api.com/v6/{API_KEY}/latest/{base_currency}"
        response = requests.get(API_URL, verify=False)
        response_data = response.json()

        if response.status_code != 200 or "conversion_rates" not in response_data:
            raise HTTPException(status_code=response.status_code, detail=response_data.get("error", "Failed to fetch rates"))

        rates = {currency.value: response_data["conversion_rates"][currency.value]
        for currency in Currency
        if currency.value != base_currency}
        return rates
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

   
