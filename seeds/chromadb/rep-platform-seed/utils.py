class Utils:
  # declare and initialize a private variable of type integer named currentId.
  _currentId = 0

  def __init__(self):
    pass

  def nextId(self):
    self._currentId += 1
    textId = str(self._currentId)
    return textId