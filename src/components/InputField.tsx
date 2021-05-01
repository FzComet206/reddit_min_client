import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from "@chakra-ui/react";

import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	label: string;
	name: string;
};

export const InputField: React.FC<InputFieldProps> = ({
	label,
	size: _,
	...props
}) => {
	// destructure
	const [field, { error }] = useField(props);
	return (
		<FormControl isInvalid={!!error}>
			<FormLabel htmlFor={field.name} textColor="whiteAlpha.900">
				{label}
			</FormLabel>
			<Input {...field} {...props} id={field.name} />

			{error ? (
				<FormErrorMessage color="yellow.400">{error}</FormErrorMessage>
			) : null}
		</FormControl>
	);
};
