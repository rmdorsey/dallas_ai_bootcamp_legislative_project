import logging

def get_logger(name: str = "chunk-testing") -> logging.Logger:
    logger = logging.getLogger(name)
    if not logger.hasHandlers():
        logger.setLevel(logging.DEBUG)
        handler = logging.StreamHandler()
        formatter = logging.Formatter("[%(asctime)s] [%(levelname)s] - %(message)s")
        handler.setFormatter(formatter)
        logger.addHandler(handler)
    return logger
