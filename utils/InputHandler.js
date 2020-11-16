"use strict"

export const clearInput = (input) => {
	return input.trim();
}

export const dateToTimestamp = (input) => {
	export const moment = require("moment");
	return moment(input).valueOf();
}

export const isArray = (input) => {
	return Array.isArray(input);
}

export const isBoolean = (input) => {
	return typeof input === "boolean";
}

export const isEmail = (input) => {
	const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
	if(pattern.test(input) && isHigherThan(input, 6)) return true;
	return false;
}

export const isEmpty = (input) => {
	if(typeof input === "undefined") return true;
	if(input === null) return true;
	if(input === "") return true;
	if(String(input.length) === 0) return true;
	if(typeof input === "object" && Object.keys(input).length === 0) return true;
	return false;
}

export const isFullName = (input) => {
	const pattern = /^[a-z\u00C0-\u02AB'´`]+\.?\s([a-z\u00C0-\u02AB'´`]+\.?\s?)+$/i;
	return pattern.test(input);
}

export const isHigherThan = (input, limit) => {
	if(isString(input)) {
		if(input.length > limit) return true;
		return false;
	}
	else {
		if(input > limit) return true;
		return false;
	}
}

export const isInteger = (input) => {
	return Number.isInteger(input);
}

export const isLowerThan = (input, limit) => {
	if(isString(input)) {
		if(input.length < limit) return true;
		return false;
	}
	else {
		if(input < limit) return true;
		return false;
	}
}

export const isNumber = (input) => {
	return typeof input === "number" && isFinite(input) && !isNaN(input);
}

export const isString = (input) => {
	return typeof input === "string";
}

export const toTitleCase = (input) => {
	let i, splitted_input = input.toLowerCase().split(' ');
	for (i = 0; i < splitted_input.length; i++)
		splitted_input[i] = `${splitted_input[i][0].toUpperCase()}${splitted_input[i].substring(1)}`;
	return splitted_input.join(' ');
}