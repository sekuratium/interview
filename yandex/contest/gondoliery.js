/*
A. Средневековый светофор (40 баллов)

В средневековой Венеции движение на каналах было столь же оживлённым, как и движение по дорогам в крупных городах.
Узкие водные пути и перекрёстки каналов требовали чёткой координации, чтобы избежать заторов и столкновений.
В наиболее оживлённых местах находились специальные регулировщики, которые управляли движением,
используя визуальные сигналы и флажки. Гондольеры, приближаясь к перекрёстку, могли подавать сигналы регулировщику —
голосом или жестами — указывая, куда они хотят поехать, и получая разрешение на дальнейшее движение.

Ваша задача — создать современную систему для обращения гондольеров к регулировщикам и создать API на JavaScript.
API должен принимать обращения гондольеров на проезд по направлению, следить за сигналами регулировщика и давать разрешение на проезд.

В рамках этой задачи мы будем считать, что средневековые венецианцы были достаточно организованными:
- у каждого направления движения своя выделенная полоса;
- гондольеры были достаточно терпеливыми и не продолжали движение без разрешения регулировщика.
Получив разрешение регулировщика, все гондольеры разрешенного направления незамедлительно начинают движение.

Заготовка
*/

/** Типы */

/*
type Signal = 'GREEN' | 'LEFT' | 'RIGHT' | 'RED';

* GREEN - Сигнал, который разрешает движение вперед
* LEFT - Сигнал, который разрешает движение налево
* RIGHT - Сигнал, который разрешает движение направо

type Direction = 'FORWARD' | 'LEFT' | 'RIGHT';

* FORWARD - Запрос на движение вперед
* LEFT - Запрос на движение налево
* RIGHT - Запрос на движение направо

type TrafficLightController = {
    subscribe: (callback: (signal: Signal) => void) => void;
}

interface ITraffic {
    go: (direction: Direction) => Promise<void>;
}
*/

const trafficLightController = {
    change(signal) {
        this.callback?.(signal);
    },
    subscribe(fn) {
        this.callback = fn;
    },
};

class Traffic {
    constructor(initialSignal, trafficLightController) {
        this.currentSignal = initialSignal;
        this.trafficLightController = trafficLightController;
        this.directions = [];
        this.resolvers = [];
    }

    go(direction) {
        this.directions.push(direction);

        return new Promise((resolve) => {
            this.resolvers.push([direction, resolve]);

            if (direction === this.currentSignal || (this.currentSignal === 'GREEN' && direction === 'FORWARD')) {
                this.resolvers.forEach(([dir, resolve]) => {
                    if (dir === direction) {
                        resolve();
                    }
                });
                return;
            }

            this.trafficLightController.subscribe((currentSignal) => {
                this.currentSignal = currentSignal;

                this.directions.forEach((dir) => {
                    if (currentSignal === dir || (currentSignal === 'GREEN' && dir === 'FORWARD')) {
                        this.resolvers.forEach(([direct, resolve]) => {
                            if (dir === direct) {
                                resolve();
                            }
                        });
                    }
                });
            });
        });
    }
}

const traffic = new Traffic('RED', trafficLightController);
traffic.go('FORWARD').then(() => console.log('lets go FORWARD 1'));
traffic.go('RIGHT').then(() => console.log('lets go RIGHT 1'));

trafficLightController.change('FORWARD');

setTimeout(() => {
    traffic.go('LEFT').then(() => console.log('lets go LEFT 1'));
    traffic.go('FORWARD').then(() => console.log('lets go FORWARD 2'));
    trafficLightController.change('LEFT');
    trafficLightController.change('FORWARD');
    trafficLightController.change('RED');
}, 1000);

setTimeout(() => {
    trafficLightController.change('LEFT');
    trafficLightController.change('RIGHT');
    traffic.go('LEFT').then(() => console.log('lets go LEFT 2'));
    trafficLightController.change('LEFT');
}, 2000);

exports.Traffic = Traffic;
