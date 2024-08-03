import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CountryInfo } from '../types';
import { useHttp } from '../hooks/http.hook';
import { paginate } from '../utils/paginate';
import { Loader } from './Loader';
import { Paginate } from './Paginate';
import { Notification } from './Notification';

export const List: FC = () => {
  const navigate = useNavigate();
  const { request, loading, error } = useHttp();
  const [ countries, setCountries ] = useState<CountryInfo[]>([]);
  const [ page, setPage ] = useState<number>(1);

  const fetchCountries = useCallback(async () => {
    const countries = await request<CountryInfo[]>('https://restcountries.com/v3.1/all');

    if (countries) setCountries(countries);
  }, [ request ]);

  useEffect(() => {
    fetchCountries();
  }, [ fetchCountries ]);

  const paginated = useMemo(() => {
    return paginate<CountryInfo>(countries, page)
  }, [ countries, page ]);

  if (error) return <Notification error={ error }/>

  if (loading) return <Loader/>;

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Flag</th>
            <th>Name</th>
            <th>Capital</th>
          </tr>
        </thead>
        <tbody>
          {
            paginated.data?.map((country, index) => (
              <tr key={ country.name.common } onClick={ () => navigate(`/${ country.name.common }`) }>
                <td>{ (paginated.page - 1) * paginated.size + index + 1 }</td>
                <td>{ country.flag }</td>
                <td>{ country.name.common }</td>
                <td>{ country.capital?.[0] }</td>
              </tr>
            ))
          }
        </tbody>
      </Table>

      <Paginate current={ page } total={ paginated.pages } setPage={ setPage }/>
    </>
  );
}
