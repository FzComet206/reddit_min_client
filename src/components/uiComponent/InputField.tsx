import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Textarea,
} from "@chakra-ui/react";

import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	label: string;
	textarea?: boolean;
	name: string;
};

export const InputField: React.FC<InputFieldProps> = ({
	label,
	textarea,
	size: _,
	...props
}) => {
	// destructure
	let InputOrTextArea = Input as any;
	if (textarea) {
		InputOrTextArea = Textarea;
	}
	const [field, { error }] = useField(props);
	return (
		<FormControl isInvalid={!!error}>
			<FormLabel htmlFor={field.name} textColor="whiteAlpha.900">
				{label}
			</FormLabel>
			<InputOrTextArea {...field} {...props} id={field.name} />

			{error ? (
				<FormErrorMessage color="yellow.400">{error}</FormErrorMessage>
			) : null}
		</FormControl>
	);
};
