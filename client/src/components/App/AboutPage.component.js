import React from 'react';
import { Title } from '../common';

const AboutPage = () => (
	<section>
		<Title>About</Title>
		<h3>
      Camagru: an instagram-like webapp where you can snap shots and add cute filters to share with the rest of the world!
			<br/>
      <br/>
      Built using ReactJS with Redux for the client-side views, NodeJS for the backend API, and PostgreSQL for the database. All technologies are currently hosted on Google Cloud Platform.
			<br/>
      <br/>
      This is currently just an MVP; there are many pending features to be added (ex. mobile-responsiveness, likes/faves, public profiles, etc.), but those can wait for now!
      <br/>
      <br/>
			Follow me @ <a target='_blank' href='https://github.com/kraxx'>github.com/kraxx</a>!
		</h3>
	</section>
)

export default AboutPage;