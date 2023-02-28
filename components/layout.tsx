import { Fragment } from 'preact';
import { asset, Head } from '$fresh/runtime.ts';

export default ({ children }) => {
	return (
		<Fragment>
			<Head>
				<link rel='stylesheet' href={asset('/base.css')} />
				<link
					rel='apple-touch-icon'
					sizes='180x180'
					href={asset('/favicon/apple-touch-icon.png')}
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href={asset('/favicon/favicon-32x32.png')}
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='192x192'
					href={asset('/favicon/android-chrome-192x192.png')}
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='16x16'
					href={asset('/favicon/favicon-16x16.png')}
				/>
				<link rel='manifest' href={asset('/favicon/site.webmanifest')} />
				<link
					rel='mask-icon'
					href={asset('/favicon/safari-pinned-tab.svg')}
					color='#5bbad5'
				/>
				<link rel='shortcut icon' href={asset('/favicon/favicon.ico')} />
				<meta name='msapplication-TileColor' content='#e0e0d1' />
				<meta
					name='msapplication-TileImage'
					content='/favicon/mstile-144x144.png'
				/>
				<meta
					name='msapplication-config'
					content='/favicon/browserconfig.xml'
				/>
				<meta name='theme-color' content='#e0e0d1' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			</Head>
			{children}
		</Fragment>
	);
};
