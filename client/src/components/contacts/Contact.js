import React, { useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import { ContactItem } from './ContactItem';


export const Contact = () => {

  const contactContext = useContext(ContactContext);
  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4>Please add a Contact</h4>
  }

  return (
    <>
      <TransitionGroup>
        {filtered !== null ?
          filtered.map(contact => (
            // timeout과 classNames속성을 줌으로써 transition effect를 적용한다.
            // className은 App.css의 388번째 줄을 참고하면 -enter, -exit, -exit-active등의 css 클래스가 있는데 - 앞에 들어갈 클래스명을 아래 classNames에 쓰면 된다.
            // timeout은 ease-in prop이 아니라 실제 아이템이 사라지는데 걸리는 시간이므로 참고하자.

            <CSSTransition key={contact.id} timeout={500} classNames="item">
              <ContactItem contact={contact} />
            </CSSTransition>
          ))
          :
          contacts.map(contact => (
            <CSSTransition key={contact.id} timeout={500} classNames="item">
              <ContactItem id={contact.id} contact={contact} />
            </CSSTransition>
          ))}
      </TransitionGroup>
    </>
  )
}
