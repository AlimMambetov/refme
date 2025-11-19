'use client'
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import cls from './style.module.scss';
import { v4 as setId } from 'uuid';
import { SwiperOptions } from 'swiper/types';
import { useIsDesktop } from '@/hooks';
import { Button, Icon, Text, Title } from '@/components/ui';

function splitArrayInHalf<T>(array: readonly T[]): [T[], T[]] {
	const middleIndex = Math.ceil(array.length / 2);
	const firstHalf = array.slice(0, middleIndex);
	const secondHalf = array.slice(middleIndex);
	return [firstHalf, secondHalf];
}


export const TopCompanies = (props: any) => {
	const isDesktop = useIsDesktop();

	const items = [
		{ id: setId(), logo: '/images/company logo/r.png', name: 'Revolut Bank', desc: '£60 for new users through the referral program' },
		{ id: setId(), logo: '/images/company logo/y.png', name: 'Yandex', desc: null },
		{ id: setId(), logo: '/images/company logo/w.png', name: 'Wolt', desc: null },
		{ id: setId(), logo: '/images/company logo/t.png', name: 'T-Bank', desc: 'Money for new clients, free communication services or promotions of companies and more' },
		{ id: setId(), logo: '/images/company logo/hsbc.png', name: 'HSBC', desc: null },
		{ id: setId(), logo: '/images/company logo/ae.png', name: 'American Express', desc: null },
		{ id: setId(), logo: '/images/company logo/a.png', name: 'Airbnb', desc: null },
		{ id: setId(), logo: '/images/company logo/pp.png', name: 'PayPal', desc: null },
	] as const;

	const [part1, part2] = splitArrayInHalf(items);
	const swiper1Ref = useRef<any>(null);
	const swiper2Ref = useRef<any>(null);



	const getSwiperOptions = (reverse: boolean = false): SwiperOptions => ({
		modules: [Autoplay, FreeMode],
		spaceBetween: 10,
		slidesPerView: "auto",
		loop: true,
		speed: 15000,
		autoplay: {
			delay: 0,
			disableOnInteraction: false,
			reverseDirection: reverse,
			stopOnLastSlide: false,
		},
		allowTouchMove: true,
		freeMode: {
			enabled: true,
			momentum: true,
			sticky: false,
			momentumBounce: true,
			momentumRatio: 1,
			momentumVelocityRatio: 1,
		},
		resistance: true,
		resistanceRatio: 0.5,
		watchSlidesProgress: true,
		noSwiping: false,
		noSwipingClass: '',
		touchRatio: 1,
		touchAngle: 45,
		simulateTouch: true,
		shortSwipes: true,
		longSwipes: true,
		longSwipesRatio: 0.5,
		longSwipesMs: 300,
		followFinger: true,
	});

	if (isDesktop) return (<>
		<div className={cls.wrap}>
			<div className={cls.head}>
				<Title level={2}>Top companies</Title>
				<Button size='hug' variant='subtle'>View all <Icon name='arrow' /></Button>
			</div>
			<div className={cls.grid}>
				{items.map(el => <div className={cls.item} key={el.id} data-desc={el.desc ? true : false}>
					<img className={cls.logo} src={el.logo} />
					<Title className={cls.title} level={4}>{el.name}</Title>
					{el.desc && <Text className={cls.desc} level='desc-2' lines={2} variant='hug'>{el.desc}</Text>}
				</div>)}

			</div>
		</div>
	</>)

	else return (<>
		<div className={cls.mobile}>
			<div className={`${cls.mobile__head} container`}>
				<Title level={3}>Top companies</Title>
				<Button size='hug' variant='subtle'>View all <Icon name='arrow' /></Button>
			</div>
			<div className={cls.mobile__companies}>
				<Swiper
					{...getSwiperOptions(true)}
					ref={swiper1Ref}
					style={{ overflow: 'visible' }}
				>
					{part1.map((el, index) => (
						<SwiperSlide key={index} style={{ width: 'auto' }}>
							<div className={cls.mobile__company}>
								<img className={cls.logo} src={el.logo} />
								<Title className={cls.title} level={4}>{el.name}</Title>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
				<Swiper
					{...getSwiperOptions(false)}
					style={{ overflow: 'visible' }}
					ref={swiper2Ref}
				>
					{part2.map((el, index) => (
						<SwiperSlide key={index} style={{ width: 'auto' }}>
							<div className={cls.mobile__company}>
								<img className={cls.logo} src={el.logo} />
								<Title className={cls.title} level={4}>{el.name}</Title>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	</>)
}

export default TopCompanies;