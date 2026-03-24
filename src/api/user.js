import {api} from './client';

const getUser = ()=> api("/user");

export default(getUser)