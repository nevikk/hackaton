import React, { useState } from 'react';
import cls from './MainPage.module.scss';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import FileInput from '../../components/FileInput/FileInput';
import axios from 'axios';

const MainPage = () => {
  const [clickable, setClickable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const changeDatasetHandler = async (event) => {
    setClickable(false);
    setIsLoading(true);
    try {
      const files = new FormData();
      files.append('dataset', event.target.files[0]);
      // console.log(event.target.files[0]);
      const url = `/train_model`;
      const response = await fetch(url, {
        method: "POST",
        cache: "no-cache",
        credentials: "same-origin",
        body: files
      });
    } catch (e) {
      console.log(e);
    } finally {
      setClickable(true);
      setIsLoading(false); 
    }
  }

  return (
    <div className={cls.wrapper}>
      <div className={cls.container}>
        <div className={cls.btns}>
          <div>
            <FileInput
              title={'Загрузить датасет'}
              accept={'.tsv'}
              name={'dataset'}
              changeHandler={changeDatasetHandler}
              disabled={!clickable}
            />
            {isLoading ? <Loader></Loader> : null}
          </div>
          {/* <Button disabled={true}>Датасет</Button> */}
          <div>
            <Link to={'/check'} className={cls.link}>
              <Button>Тест</Button>
            </Link>
          </div>
          <div>
            <Button disabled={true}>Загрузить чеки</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage;