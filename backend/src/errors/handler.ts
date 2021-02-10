import { ErrorRequestHandler } from "express";
import { ValidationError } from "yup";
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

interface ValidationErrors {
	[key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	console.log(err);
	
	if (err instanceof ValidationError) {
		let errors: ValidationErrors = {};

		err.inner.forEach(e => {
			if (e.path) 
				errors[e.path] = e.errors;
		});

		return res.status(400).json({ message: 'Validation fails', errors });
	} else if (err instanceof EntityNotFoundError) {
		return res.status(400).json({ message: 'Entity not found' });
	}
	return res.status(500).json({ message: 'Internal server errror' });
}

export default errorHandler;
