'use client'
import React, { useEffect, useState } from 'react'

export default function Letters({ str }: { str: string }) {
    const [text, setText] = useState('');
    const [i, setI] = useState(0);
    const [j, setJ] = useState(str.length - 1);

    useEffect(() => {
        setTimeout(() => {
            // add
            if (i !== str.length) {
                if (str[i] === ' ') {
                    setText(text + ' ' + str[i + 1]);
                    setI(i + 2);
                }
                else {
                    setText(text + str[i]);
                    setI(i + 1);
                }
            }
            // delete
            else {
                if (j > 0 && text[j - 1] === ' ') {
                    setText(text.slice(0, j - 1));
                    setJ(j - 2)
                }
                else {
                    setText(text.slice(0, j));
                    setJ(j - 1)
                }
                // reset
                if (j === 0) {
                    setI(0);
                    setJ(str.length - 1)
                };
            }
        }, 200);

    }, [text]);

    return (
        <div className={`mt-16 flex justify-center items-center text-xl text-white/90 `}>
            <p className='text-center'>{text}</p>
        </div>
    )
} 
