import mongoose from 'mongoose';

const isBlank = (value) => value === undefined || value === null || String(value).trim() === '';
const hasAny = (body, fields) => fields.some((field) => body[field] !== undefined);

const sendValidationError = (res, errors) => {
    return res.status(400).json({
        success: false,
        message: 'Të dhënat nuk janë valide',
        errors
    });
};

const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(String(email));
const validateEnum = (value, allowed) => allowed.includes(value);
const validateId = (value) => {
    if (Number.isFinite(Number(value)) && Number(value) > 0) return true;
    return mongoose.Types.ObjectId.isValid(value);
};

const validatePositiveNumber = (value) => Number.isFinite(Number(value)) && Number(value) > 0;
const validateNonNegativeNumber = (value) => Number.isFinite(Number(value)) && Number(value) >= 0;
const validateDate = (value) => !Number.isNaN(Date.parse(value));

export const validateIdParam = (paramName = 'id') => (req, res, next) => {
    if (!validateId(req.params[paramName])) {
        return sendValidationError(res, [`${paramName} nuk është ID valide`]);
    }
    return next();
};

export const validateRegisterUser = (req, res, next) => {
    const errors = [];
    const { name, email, password } = req.body;

    if (isBlank(name)) errors.push('Emri është i detyrueshëm');
    if (isBlank(email) || !validateEmail(email)) errors.push('Email nuk është valid');
    if (isBlank(password) || String(password).length < 6) errors.push('Password duhet të ketë së paku 6 karaktere');

    return errors.length ? sendValidationError(res, errors) : next();
};

export const validateLoginUser = (req, res, next) => {
    const errors = [];
    const { email, password } = req.body;

    if (isBlank(email) || !validateEmail(email)) errors.push('Email nuk është valid');
    if (isBlank(password)) errors.push('Password është i detyrueshëm');

    return errors.length ? sendValidationError(res, errors) : next();
};

export const validateUpdateMe = (req, res, next) => {
    const errors = [];
    const { name, email, password } = req.body;

    if (!hasAny(req.body, ['name', 'email', 'password'])) {
        errors.push('Dërgo të paktën një fushë për përditësim');
    }
    if (name !== undefined && isBlank(name)) errors.push('Emri nuk mund të jetë bosh');
    if (email !== undefined && (isBlank(email) || !validateEmail(email))) errors.push('Email nuk është valid');
    if (password !== undefined && (isBlank(password) || String(password).length < 6)) {
        errors.push('Password duhet të ketë së paku 6 karaktere');
    }

    return errors.length ? sendValidationError(res, errors) : next();
};

export const validateCreateAccount = (req, res, next) => {
    const errors = [];
    const { name, type, balance } = req.body;

    if (isBlank(name)) errors.push('Emri i llogarisë është i detyrueshëm');
    if (type !== undefined && !validateEnum(type, ['cash', 'bank', 'credit_card', 'checking', 'other'])) {
        errors.push('Tipi i llogarisë nuk është valid');
    }
    if (balance !== undefined && !validateNonNegativeNumber(balance)) {
        errors.push('Balanca duhet të jetë numër jo negativ');
    }

    return errors.length ? sendValidationError(res, errors) : next();
};

export const validateUpdateAccount = (req, res, next) => {
    const errors = [];
    const { name, type, balance } = req.body;

    if (!hasAny(req.body, ['name', 'type', 'balance'])) errors.push('Dërgo të paktën një fushë për përditësim');
    if (name !== undefined && isBlank(name)) errors.push('Emri i llogarisë nuk mund të jetë bosh');
    if (type !== undefined && !validateEnum(type, ['cash', 'bank', 'credit_card', 'checking', 'other'])) {
        errors.push('Tipi i llogarisë nuk është valid');
    }
    if (balance !== undefined && !validateNonNegativeNumber(balance)) {
        errors.push('Balanca duhet të jetë numër jo negativ');
    }

    return errors.length ? sendValidationError(res, errors) : next();
};

export const validateCreateCategory = (req, res, next) => {
    const errors = [];
    const { name, type } = req.body;

    if (isBlank(name)) errors.push('Emri i kategorisë është i detyrueshëm');
    if (!validateEnum(type, ['income', 'expense'])) errors.push('Tipi i kategorisë duhet të jetë income ose expense');

    return errors.length ? sendValidationError(res, errors) : next();
};

export const validateUpdateCategory = (req, res, next) => {
    const errors = [];
    const { name, type } = req.body;

    if (!hasAny(req.body, ['name', 'type', 'color'])) errors.push('Dërgo të paktën një fushë për përditësim');
    if (name !== undefined && isBlank(name)) errors.push('Emri i kategorisë nuk mund të jetë bosh');
    if (type !== undefined && !validateEnum(type, ['income', 'expense'])) {
        errors.push('Tipi i kategorisë duhet të jetë income ose expense');
    }

    return errors.length ? sendValidationError(res, errors) : next();
};

export const validateCreateTransaction = (req, res, next) => {
    const errors = [];
    const { account, category, amount, type, date } = req.body;

    if (!validateId(account)) errors.push('Llogaria duhet të jetë ID valide');
    if (!validateId(category)) errors.push('Kategoria duhet të jetë ID valide');
    if (!validatePositiveNumber(amount)) errors.push('Shuma duhet të jetë numër pozitiv');
    if (!validateEnum(type, ['income', 'expense'])) errors.push('Tipi i transaksionit duhet të jetë income ose expense');
    if (date !== undefined && !validateDate(date)) errors.push('Data nuk është valide');

    return errors.length ? sendValidationError(res, errors) : next();
};

export const validateUpdateTransaction = (req, res, next) => {
    const errors = [];
    const { account, category, amount, type, date } = req.body;

    if (!hasAny(req.body, ['account', 'category', 'amount', 'type', 'description', 'date'])) {
        errors.push('Dërgo të paktën një fushë për përditësim');
    }
    if (account !== undefined && !validateId(account)) errors.push('Llogaria duhet të jetë ID valide');
    if (category !== undefined && !validateId(category)) errors.push('Kategoria duhet të jetë ID valide');
    if (amount !== undefined && !validatePositiveNumber(amount)) errors.push('Shuma duhet të jetë numër pozitiv');
    if (type !== undefined && !validateEnum(type, ['income', 'expense'])) {
        errors.push('Tipi i transaksionit duhet të jetë income ose expense');
    }
    if (date !== undefined && !validateDate(date)) errors.push('Data nuk është valide');

    return errors.length ? sendValidationError(res, errors) : next();
};

export const validateCreateBudget = (req, res, next) => {
    const errors = [];
    const { category, amount, startDate, endDate } = req.body;

    if (!validateId(category)) errors.push('Kategoria duhet të jetë ID valide');
    if (!validatePositiveNumber(amount)) errors.push('Shuma e buxhetit duhet të jetë numër pozitiv');
    if (!validateDate(startDate)) errors.push('Data e fillimit nuk është valide');
    if (!validateDate(endDate)) errors.push('Data e mbarimit nuk është valide');
    if (validateDate(startDate) && validateDate(endDate) && new Date(endDate) < new Date(startDate)) {
        errors.push('Data e mbarimit duhet të jetë pas datës së fillimit');
    }

    return errors.length ? sendValidationError(res, errors) : next();
};

export const validateUpdateBudget = (req, res, next) => {
    const errors = [];
    const { category, amount, startDate, endDate } = req.body;

    if (!hasAny(req.body, ['category', 'amount', 'startDate', 'endDate'])) {
        errors.push('Dërgo të paktën një fushë për përditësim');
    }
    if (category !== undefined && !validateId(category)) errors.push('Kategoria duhet të jetë ID valide');
    if (amount !== undefined && !validatePositiveNumber(amount)) errors.push('Shuma e buxhetit duhet të jetë numër pozitiv');
    if (startDate !== undefined && !validateDate(startDate)) errors.push('Data e fillimit nuk është valide');
    if (endDate !== undefined && !validateDate(endDate)) errors.push('Data e mbarimit nuk është valide');
    if (validateDate(startDate) && validateDate(endDate) && new Date(endDate) < new Date(startDate)) {
        errors.push('Data e mbarimit duhet të jetë pas datës së fillimit');
    }

    return errors.length ? sendValidationError(res, errors) : next();
};

export const validateCreateSavingGoal = (req, res, next) => {
    const errors = [];
    const { name, targetAmount, currentAmount, dueDate } = req.body;

    if (isBlank(name)) errors.push('Emri i objektivit është i detyrueshëm');
    if (!validatePositiveNumber(targetAmount)) errors.push('Shuma target duhet të jetë numër pozitiv');
    if (currentAmount !== undefined && !validateNonNegativeNumber(currentAmount)) {
        errors.push('Shuma aktuale duhet të jetë numër jo negativ');
    }
    if (dueDate !== undefined && !validateDate(dueDate)) errors.push('Data e objektivit nuk është valide');

    return errors.length ? sendValidationError(res, errors) : next();
};

export const validateUpdateSavingGoal = (req, res, next) => {
    const errors = [];
    const { name, targetAmount, currentAmount, dueDate } = req.body;

    if (!hasAny(req.body, ['name', 'targetAmount', 'currentAmount', 'dueDate'])) {
        errors.push('Dërgo të paktën një fushë për përditësim');
    }
    if (name !== undefined && isBlank(name)) errors.push('Emri i objektivit nuk mund të jetë bosh');
    if (targetAmount !== undefined && !validatePositiveNumber(targetAmount)) {
        errors.push('Shuma target duhet të jetë numër pozitiv');
    }
    if (currentAmount !== undefined && !validateNonNegativeNumber(currentAmount)) {
        errors.push('Shuma aktuale duhet të jetë numër jo negativ');
    }
    if (dueDate !== undefined && !validateDate(dueDate)) errors.push('Data e objektivit nuk është valide');

    return errors.length ? sendValidationError(res, errors) : next();
};