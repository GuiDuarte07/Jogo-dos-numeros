import React, { useEffect, useRef } from 'react';
import { Box } from './style';
import leftEvent from '../../utils/leftEvent';
import topEvent from '../../utils/topEvent';
import rightEvent from '../../utils/rightEvent';
import bottomEvent from '../../utils/bottomEvent';

export default function DragPiece({ drag, number, dispatch }) {
    const ref = useRef();
    //const initialXY = useRef([]);
    console.log('rending')

    useEffect(() => {
        const elRef = ref;

        ref.current.ondragstart = function() {
            return false;
        };

        ref.current.onmousedown = function(event) {
            console.log("Ativou onmousedown", ref.current)
            event.preventDefault(); // prevent selection start (browser action)
            switch (drag) {
                case 'LEFT':
                    leftEvent(ref, event, dispatch);
                break;
                case 'TOP':
                    topEvent(ref, event, dispatch);
                    break;
                case 'RIGHT':
                    rightEvent(ref, event, dispatch);
                    break;
                case 'BOTTOM':
                    bottomEvent(ref, event, dispatch);
                    break;
                default:
                    throw new Error('Erro Inesperado!');
            }
        };

        return () => {
            console.log('a', !!elRef.current)
            if (elRef.current){
                elRef.current.onmousedown = null;
                elRef.current.ondragstart = null;
            };
        };
    }, [drag, dispatch]);

    return (
        <Box ref={ref} colorScame={number}>
            <span>{number}</span>
        </Box>
    )
}
