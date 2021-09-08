import React, { useEffect, useState } from "react"
import Head from 'next/head'
import Entrada from "../components/Entrada"
import Hero from "../components/Hero"
import LabelsList from "../components/LabelsList"
import Layout from "../components/layout"
import axios from "axios"
import UserProfile from "../components/UserProfile"
import UserReceive from "../components/UserReceive"
import mqtt from "mqtt"

const biciparqueadero = () => {
    const [entrada, setEntrada] = useState(false)
    const [profile, setProfile] = useState(false)
    const [code, setCode] = useState(0)
    const [racks, setRacks] = useState({})
    const [state, setState] = useState(false)
    const [receive, setReceive] = useState(false)

    const [isActive, setIsActive] = useState(false)
    const [count, setCount] = useState(10)


    const toogleProfile = () => {
        setProfile(!profile)
        setCode("")
    }

    const toogleReceive = () => {
        setReceive(!receive)
    }


    const onSubmit = async (e) => {
        e.preventDefault()

        const response = await axios.get('/api/hello')
        console.log(response)
        setIsActive(true)
        const time = setInterval(() => {

            setCount(cuenta => {
                if (cuenta <= 0) {
                    clearInterval(time)
                    return 10
                } else {
                    return cuenta - 1
                }
            })

        }, 1000);
        setTimeout(async () => {
            setIsActive(false)
            await axios.get('/api/hello')
        }, 10000)

    }

    const toogleEntrada = () => {
        setEntrada(!entrada)
    }

    return (
        <Layout toogleProfile={toogleProfile} urlImg="/img/map.jpg">
            <Head>
                <title>RODA</title>
            </Head>
            {profile ? (
                receive ? (
                    <UserReceive />
                ) : (
                    <UserProfile toogleProfile={toogleReceive} />
                )
            ) : (
                <Hero
                    toogleEntrada={toogleEntrada}
                    entrada={entrada}
                    state={state}
                >
                    {/* {entrada ? ( */}
                    <div className="entrada">
                        <Entrada
                            count={count}
                            isActive={isActive}
                            onSubmit={onSubmit}
                            code={code}
                            state={state}
                        />
                    </div>
                    {/* ) : ( */}
                    <div className="list">
                        <LabelsList racks={racks} />
                    </div>
                    {/* )} */}
                </Hero>
            )}
            <style jsx>{`
            
                .entrada {
                    height: ${entrada ? '70%' : '0'};
                    opacity: ${entrada ? '1' : '0'};
                    overflow: hidden;
                    transition: height .7s, opacity .7s;
                }

                .list {
                    height: ${entrada ? '0' : '70%'};
                    opacity: ${entrada ? '0' : '1'};
                    overflow: hidden;
                    transition: height .7s, opacity .7s;
                }
            
            `}</style>
        </Layout>
    )
}

export default biciparqueadero
