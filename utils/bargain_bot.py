# utils/bargain_bot.py
def generate_bargaining_tips(product_name: str, current_price: float, median_price: float):
    """
    Returns a small guidance text for bargaining.
    Logic:
    - If overpriced → suggest bargaining strategies
    - If fair → suggest polite confirmation
    """
    tips = f"For {product_name}: "

    if current_price > median_price:
        tips += ("The current price is higher than average. "
                 "You can try bargaining by pointing out competitor prices, "
                 "highlighting minor imperfections, or asking for a discount "
                 "if buying multiple items.")
    else:
        tips += "The price seems fair. You may politely confirm the price or ask for small extras."

    return tips
