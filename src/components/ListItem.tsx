import React, { FC, useCallback, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { CountryInfo } from '../types';
import { useHttp } from '../hooks/http.hook';
import { Loader } from './Loader';
import { Notification } from './Notification';

export const ListItem: FC = () => {
  const params = useParams();
  const { request, loading, error } = useHttp();
  const [ country, setCountry ] = useState<CountryInfo | null>(null);

  const fetchCountry = useCallback(async () => {
    const data = await request<CountryInfo[]>(`https://restcountries.com/v3.1/name/${ params.countryName }`);

    if (data?.[0]) setCountry(data[0]);
  }, [ request, params ]);

  useEffect(() => {
    fetchCountry();
  }, [ fetchCountry ]);

  if (error) return <Notification error={ error }/>

  if (loading) return <Loader/>;

  return (
    <Card>
      <Card.Img variant="top" src={ country?.flags.svg }/>
      <Card.Body>
        <Card.Title>Name: { country?.name.common }</Card.Title>
        <Card.Text>Capital: { country?.capital }</Card.Text>
      </Card.Body>
    </Card>
  );
}
