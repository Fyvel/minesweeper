import { PropsWithChildren } from "react";
import styled from "styled-components";

type IconProps = {
	size?: 18 | 24 | 36 | 48,
	variant?: 'primary' | 'secondary',
}
export default function Icon({
	size,
	variant = 'primary',
	children 
}: PropsWithChildren<IconProps>) {
	return <MaterialIcon size={size || 36} variant={variant || 'primary'}>
		{children}
	</MaterialIcon>
}

type MaterialIconProps = {
	size: 18 | 24 | 36 | 48,
	variant: 'primary' | 'secondary',
}
const MaterialIcon = styled.span
	.attrs((props: MaterialIconProps) => ({
		className: `material-icons md-${props.size}`
	})) <MaterialIconProps>`
		cursor: pointer;
		color: ${p => p.theme[p.variant]};
	`
