import { archivo } from './ui/fonts';
import './ui/global.scss';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={`${archivo.className} antialiased`}>{children}</body>
		</html>
	);
}
