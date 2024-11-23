import * as React from 'react';
import { Html, Head, Preview, Body, Container, Heading, Text } from '@react-email/components';

interface EmailTemplateProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  numPeople: number;
  arrivalTime: string;
  reservationDate: string;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({
  firstName,
  lastName,
  email,
  phone,
  numPeople,
  arrivalTime,
  reservationDate,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Confirmation de votre réservation</Preview>
      <Body className="bg-gray-100 text-gray-900">
        <Container className="bg-white rounded-lg shadow p-6">
          <Heading className="text-xl font-bold mb-4">Nouvelle réservation !</Heading>
          <Text className="mb-4">Bonjour {firstName} {lastName}, merci pour votre réservation !</Text>
          <Text className="mb-4">Voici les détails de votre réservation :</Text>
          <Text className="mb-2">Nom : {firstName} {lastName}</Text>
          <Text className="mb-2">Email : {email}</Text>
          <Text className="mb-2">Téléphone : {phone}</Text>
          <Text className="mb-2">Nombre de personnes : {numPeople}</Text>
          <Text className="mb-2">Heure d'arrivée : {arrivalTime}</Text>
          <Text className="mb-2">Date de réservation : {new Date(reservationDate).toLocaleDateString()}</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailTemplate;
