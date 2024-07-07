'use client'
import Header from "./components/Layout/Header";
import Layout from "./components/Layout";
import { Provider } from 'react-redux';
import store from '../../store/store';

export default function Home() {
  return (
   <Provider store={store}>
     <div>
       <Header/>
       <Layout /> 
     </div>
   </Provider>
  );
}
