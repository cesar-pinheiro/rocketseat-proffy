import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
  return (
    <article className="teacher-item">
          
      <header>
        <img src="https://pickaface.net/gallery/avatar/unr_balddarcy_180316_2126_bkxt.png" alt="avatar"/>
        <div>
          <strong>César A Pinheiro</strong>
          <span>Quimica</span>
        </div>
      </header>

      <p>
        Chupa cana que é uma beleza
        <br/><br/>
        O cara que é todo cheio de quer ser mas no fundo adora chupar uma cana. hahaha...
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 99,99</strong>
        </p>
        <button>
          <img src={whatsappIcon} alt="Whatsapp"/>
          Entrar em contato
        </button>
      </footer>

    </article>
  );
}

export default TeacherItem;
