import React from 'react';
import Card from '../components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faBook,
  faDollarSign,
  faBuilding,
  faGraduationCap,
  faUsers,
  faClipboardList,
} from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  return (
    <div className="container">
      <Card icon={<FontAwesomeIcon icon={faTachometerAlt} />} title="Dashboard" link="Go to Dashboard" href="/dashboard" />
      <Card icon={<FontAwesomeIcon icon={faBook} />} title="Research" link="View Research" href="/research" />
      <Card icon={<FontAwesomeIcon icon={faDollarSign} />} title="Finance" link="View Finance" href="/finance" />
      <Card icon={<FontAwesomeIcon icon={faGraduationCap} />} title="Academics" link="View Academics" href="/academics" />
      <Card icon={<FontAwesomeIcon icon={faUsers} />} title="Collaboration" link="View Collaboration" href="/collaboration" />
      <Card icon={<FontAwesomeIcon icon={faClipboardList} />} title="Final Report" link="View Report" href="/report" />
    </div>
  );
};

export default Home;
