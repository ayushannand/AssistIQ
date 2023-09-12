import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import styles from '../styles/inputCard.module.css';
import copy from '../assets/icons/copy.png';
import copied from '../assets/icons/copied.png';
import Image from 'next/image';

const InputCard = ({ message }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className={`${styles.card} ${styles.inputCard}`}>
      <div className={styles.inputContent}>{message}</div>
      <div className={styles.copyButtonContainer}>
        <CopyToClipboard text={message}>
          <button className={styles.copyButton} onClick={handleCopy}>
            {isCopied ? <Image src={copied} alt="Copied" /> : <Image src={copy} alt="Copy" />}
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default InputCard;
