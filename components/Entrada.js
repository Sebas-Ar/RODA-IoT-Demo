import React from 'react'

const Entrada = ({ onSubmit, code, state, isActive, count }) => {
    return (
        <div className="container">

            <h1>{state ? 'salir del' : 'entrar al'} biciparqueadero</h1>
            <br />
            <p>Parqueando...</p>
            <br />
            <form onSubmit={e => onSubmit(e)}>
                <button disabled={isActive}>Accionar Candado</button>
                <p>{count === 10 ? '' : count}</p>
            </form>

            <style jsx>{`
            
                h1 {
                    text-align: center;
                    color: white;
                    font-size: 24px;
                    text-transform: uppercase;
                    margin: 50px 0 20px;
                }

                p {
                    color: white;
                    text-align: center;
                    margin: 15px 0;
                    font-size: 1.2rem;
                    font-weight: 700;
                }

                


                button {
                    height: 40px;
                    border-radius: 30px;
                    font-size: 16px;
                    padding: 0 20px;
                    color: white;
                    display: block;
                    margin: auto;
                    background: var(--grayOpacity);
                    transition: opacity .5s, transform .5s;
                }

                button:hover {
                    transform: scale(1.05)
                }

                button:disabled {
                    cursor: normal;
                    opacity: .5;
                }
            
            `}</style>
        </div>
    )
}

export default Entrada
