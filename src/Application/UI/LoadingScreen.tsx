import React, { useEffect, useState } from 'react';
import eventBus from './EventBus';

type LoadingProps = {};

const LoadingScreen: React.FC<LoadingProps> = () => {
    const [progress, setProgress] = useState(0);
    const [toLoad, setToLoad] = useState(0);
    const [loaded, setLoaded] = useState(0);
    const [overlayOpacity, setOverlayOpacity] = useState(1);

    const [showBiosInfo, setShowBiosInfo] = useState(false);
    const [showLoadingResources, setShowLoadingResources] = useState(false);
    const [doneLoading, setDoneLoading] = useState(false);
    const [resourcesLoaded] = useState<string[]>([]);

    useEffect(() => {
        eventBus.on('loadedSource', (data) => {
            setProgress(data.progress);
            setToLoad(data.toLoad);
            setLoaded(data.loaded);
            console.log('NEW DATA: ', data.sourceName);
            resourcesLoaded.push(
                `Loaded ${data.sourceName}${getSpace(
                    data.sourceName
                )}... ${Math.round(data.progress * 100)}%`
            );
        });
        setTimeout(() => {
            setShowBiosInfo(true);
        }, 500);
        setTimeout(() => {
            setShowLoadingResources(true);
        }, 900);
    }, []);

    useEffect(() => {
        console.log(progress, toLoad, loaded);
        if (progress >= 1) {
            setDoneLoading(true);
            setTimeout(() => {
                setOverlayOpacity(0);
                eventBus.dispatch('loadingScreenDone', {});
            }, 1000);
        }
    }, [progress]);

    const getSpace = (sourceName: string) => {
        let spaces = '';
        for (let i = 0; i < 24 - sourceName.length; i++) spaces += '\xa0';
        return spaces;
    };

    const getCurrentDate = () => {
        const date = new Date();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        // add leading zero
        const monthFormatted = month < 10 ? `0${month}` : month;
        const dayFormatted = day < 10 ? `0${day}` : day;
        return `${monthFormatted}/${dayFormatted}/${year}`;
    };

    return (
        <div
            style={Object.assign({}, styles.overlay, {
                opacity: overlayOpacity,
                transform: `scale(${overlayOpacity === 0 ? 1.06 : 1})`,
            })}
        >
            <div style={styles.header}>
                <div style={styles.logoContainer}>
                    {/* add image of logo */}
                    <img
                        style={styles.logoImage}
                        src={require('../../../static/ui/boot_world.png')}
                        alt="logo"
                    />
                    <div>
                        <p>
                            <b>Heffernan,</b>{' '}
                        </p>
                        <p>
                            <b>Henry Inc.</b>
                        </p>
                    </div>
                </div>
                <div style={styles.headerInfo}>
                    <p>Released: 01/13/2000</p>
                    <p>HHBIOS (C)2000 Heffernan Henry Inc.,</p>
                </div>
            </div>
            <div style={styles.body}>
                <p>BCN SIT 1989-1994 Special UC612C</p>
                <br />
                {showBiosInfo && (
                    <>
                        <p>SIT Rehab(tm) XX 115</p>
                        <p>Checking RAM : 12000K OK</p>
                        <br />
                        {showLoadingResources ? (
                            progress == 1 ? (
                                <p>FINISHED LOADING RESOURCES</p>
                            ) : (
                                <p className="loading">
                                    LOADING RESOURCES ({loaded}/
                                    {toLoad === 0 ? '-' : toLoad})
                                </p>
                            )
                        ) : (
                            <p className="loading">WAIT</p>
                        )}
                    </>
                )}
                <br />
                <div style={styles.resourcesLoadingList}>
                    {showLoadingResources &&
                        resourcesLoaded.map((resource) => (
                            <p key={resource}>{resource}</p>
                        ))}
                </div>
                <br />
                {showLoadingResources && doneLoading && (
                    <p>
                        All Content Loaded, launching{' '}
                        <b>'Henry Heffernan Portfolio Showcase'</b> V1.0
                    </p>
                )}
                <br />
            </div>
            <div style={styles.footer}>
                <p>
                    Press <b>DEL</b> to enter SETUP , <b>ESC</b> to skip memory
                    test
                </p>
                <p>{getCurrentDate()}</p>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    overlay: {
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'opacity 0.2s, transform 0.2s',
        transitionTimingFunction: 'ease-in-out',
        boxSizing: 'border-box',
        fontSize: 16,
    },
    header: {
        width: '100%',
        boxSizing: 'border-box',
        padding: 48,
        display: 'flex',
        flexDirection: 'row',
    },
    headerInfo: {
        marginLeft: 64,
    },
    body: {
        flex: 1,
        display: 'flex',
        width: '100%',
        boxSizing: 'border-box',
        flexDirection: 'column',
        paddingLeft: 48,
        paddingRight: 48,
    },
    logoContainer: {
        // marginLeft: 64,
        display: 'flex',
        flexDirection: 'row',
    },
    resourcesLoadingList: {
        display: 'flex',
        paddingLeft: 24,
        flexDirection: 'column',
    },
    logoImage: {
        width: 64,
        height: 42,
        // backgroundColor: 'red',
        imageRendering: 'pixelated',
        marginRight: 16,
    },
    footer: {
        padding: 48,
        paddingBottom: 64,
        boxSizing: 'border-box',
        width: '100%',
    },
};

export default LoadingScreen;
