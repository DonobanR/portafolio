export class ZodError extends Error {
  constructor(issues) {
    super('Validation error');
    this.issues = issues;
  }
}

class ZodString {
  constructor() {
    this.validators = [];
    this.shouldTrim = false;
    this.requiredMessage = 'Campo requerido';
    this.typeMessage = 'Debe ser texto';
  }

  trim() {
    this.shouldTrim = true;
    return this;
  }

  min(length, message = `Debe tener al menos ${length} caracteres`) {
    this.validators.push((value) => (value.length >= length ? true : message));
    return this;
  }

  max(length, message = `Debe tener como máximo ${length} caracteres`) {
    this.validators.push((value) => (value.length <= length ? true : message));
    return this;
  }

  email(message = 'Correo electrónico inválido') {
    const emailExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;
    this.validators.push((value) => (emailExpression.test(value) ? true : message));
    return this;
  }

  nonempty(message = 'Campo requerido') {
    this.requiredMessage = message;
    return this.min(1, message);
  }

  parse(value, path) {
    if (value === undefined || value === null) {
      throw new ZodError([{ path, message: this.requiredMessage }]);
    }

    if (typeof value !== 'string') {
      throw new ZodError([{ path, message: this.typeMessage }]);
    }

    let result = value;
    if (this.shouldTrim) {
      result = result.trim();
    }

    for (const validator of this.validators) {
      const outcome = validator(result);
      if (outcome !== true) {
        throw new ZodError([{ path, message: outcome }]);
      }
    }

    return result;
  }
}

class ZodObject {
  constructor(shape) {
    this.shape = shape;
  }

  parse(data) {
    const payload = data ?? {};
    const result = {};
    const issues = [];

    for (const [key, schema] of Object.entries(this.shape)) {
      try {
        result[key] = schema.parse(payload[key], key);
      } catch (error) {
        if (error instanceof ZodError) {
          issues.push(...error.issues);
        } else {
          issues.push({ path: key, message: error.message ?? 'Valor inválido' });
        }
      }
    }

    if (issues.length > 0) {
      throw new ZodError(issues);
    }

    return result;
  }
}

export const z = {
  string: () => new ZodString(),
  object: (shape) => new ZodObject(shape)
};
