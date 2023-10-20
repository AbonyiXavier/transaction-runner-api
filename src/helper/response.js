const successfulResponse = ({ res, data, message, meta }) => {
  return res.status(200).json({
    status: true,
    message,
    meta,
    data,
  });
};

const createdResponse = ({ res, data, message }) => {
  return res.status(201).json({
    status: true,
    message,
    data,
  });
};

const deletedResponse = ({ res, data, message }) => {
  return res.status(204).json({
    status: true,
    message,
    data,
  });
};

const conflictResponse = ({ res, data, message }) => {
  return res.status(409).json({
    status: false,
    message,
    data,
  });
};

const badRequestResponse = ({ res, data, message }) => {
  return res.status(400).json({
    status: false,
    message,
    data,
  });
};

const unauthorizedResponse = ({ res, data, message }) => {
  return res.status(401).json({
    status: false,
    message,
    data,
  });
};

const forbiddenResponse = ({ res, data, message }) => {
  return res.status(403).json({
    status: false,
    message,
    data,
  });
};

const notFoundResponse = ({ res, data, message }) => {
  return res.status(404).json({
    status: false,
    message,
    data,
  });
};

const serverErrorResponse = ({ res, data, message }) => {
  return res.status(500).json({
    status: false,
    message,
    data,
  });
};

const validationErrorResponse = ({ res, message, field }) => {
  return res.status(500).json({
    status: false,
    message: 'validation error',
    data: [
      {
        message,
        field,
        validation: 'valid',
      },
    ],
  });
};

export {
  successfulResponse,
  conflictResponse,
  createdResponse,
  deletedResponse,
  badRequestResponse,
  unauthorizedResponse,
  forbiddenResponse,
  notFoundResponse,
  serverErrorResponse,
  validationErrorResponse,
};
