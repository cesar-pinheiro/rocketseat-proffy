import React from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
export interface Teacher {
    avatar: string;
    bio: string; 
    cost: number,
    id: number,
    name: string;
    subject: string;
    user_id: number,
    whatsapp: string;
}
interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  const history = useHistory();

  async function createNewConnection() {
    await api.post('/connections', {
      user_id: teacher.id
    })

    history.push('/');
  }

  return (
    <article className="teacher-item">
          
      <header>
        <img src={teacher.avatar} alt="avatar"/>
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>
        {teacher.bio}
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ {teacher.cost}</strong>
        </p>
        <button>
          <a
            target="_blank"
            onClick={createNewConnection}
            href={`https://wa.me/${teacher.whatsapp}`}
          >
            <img src={whatsappIcon} alt="Whatsapp"/>
            Entrar em contato
          </a>
        </button>
      </footer>

    </article>
  );
}

export default TeacherItem;
