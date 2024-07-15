from enum import Enum


class Currency(str, Enum):
    Chinese_Yuan_RMB = "CNY"
    Euro = "EUR"
    British_Pound_Sterling = "GBP"
    Israeli_New_Sheqel = "ILS"
    US_Dollar = "USD"