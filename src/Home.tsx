
import dayjs from 'dayjs';
import './css/App.css'
import { Helmet } from 'react-helmet-async';
// import { useCookies } from 'react-cookie';

import { is_after_pm5 } from './func/date';
import { check_cookie } from './func/cookie';

const Home = () => {
  // const [cookies, setCookie] = useCookies(["dp_count"]);

  return (
    <>
      <Helmet>
        <title>School Hit</title>
      </Helmet>

      <h1>School Hit</h1>
      <br />

      <input type="date" id="check_date" defaultValue={is_after_pm5(dayjs())} />
      <br />
      <br />
      <button onClick={check_cookie}>Check</button>
    </>
  )
}

export default Home;
