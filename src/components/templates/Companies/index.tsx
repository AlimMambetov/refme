'use client'
import React from 'react';
import cls from './style.module.scss';
import dynamic from 'next/dynamic';
import { useScreen } from '@/hooks';
import { Title } from '@/components/ui';
import { CompanyCard, SearchBlock } from '@/components/common';

export const Companies = (props: any) => {
	const { isDesktop } = useScreen();

	const topCompanies = [
		{
			title: "Revolut Bank",
			preview: "/images/company logo/r.png",
			liked: false,
			followers: 106,
			links: 286
		},
		{
			title: "T-Bank",
			preview: "/images/company logo/t.png",
			liked: false,
			followers: 118,
			links: 835
		},
		{
			title: "Yandex",
			preview: "/images/company logo/y.png",
			liked: false,
			followers: 362,
			links: 1583
		},
		{
			title: "American Express",
			preview: "/images/company logo/ae.png",
			liked: false,
			followers: 27,
			links: 841
		},
		{
			title: "Wolt",
			preview: "/images/company logo/w.png",
			liked: false,
			followers: 45,
			links: 960
		},
		{
			title: "HSBS Bank",
			preview: "/images/company logo/hsbc.png",
			liked: false,
			followers: 1003,
			links: 2174
		},
		{
			title: "Airbnb",
			preview: "/images/company logo/a.png",
			liked: false,
			followers: 85,
			links: 210
		},
		{
			title: "Company Name",
			// preview: "",
			liked: false,
			followers: 73,
			links: 477
		},

	]


	const letters = ['0-9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']


	const contentArr = [
		{
			letter: '0-9',
			data: [1, 2, 3, 4, 5]
		},
		{
			letter: 'a',
			data: [1, 2, 3, 4]
		},
		{
			letter: 'b',
			data: [1, 2, 3, 4, 5, 6, 7]
		},
		{
			letter: 'c',
			data: [1, 2, 3]
		},
		{
			letter: 'd',
			data: [1, 2, 3, 4, 5, 6, 7, 8, 9]
		},
		{
			letter: 'e',
			data: [1, 2, 3, 4, 5]
		},
		{
			letter: 'f',
			data: [1, 2, 3, 4, 5, 6]
		},
	]


	return (<>
		<div data-desktop={isDesktop} className={`${cls.wrap} container`}>
			<Title level={isDesktop ? 1 : 2}>Top companies</Title>
			<div className={cls.top}>
				{topCompanies.map((el, i) =>
					<CompanyCard {...el} key={i} />
				)}
			</div>

			<div className={cls.content}>
				<SearchBlock title='All companies' />
				{isDesktop && <div className={cls.letters}>
					{letters.map((el, i) => <div className={cls.letters__item} key={i}>{el}</div>)}
				</div>}

				<div className={cls.blocks}>
					{contentArr.map((el, idx) => <div key={idx} className={cls.blocks__item}>
						<div className={cls.blocks__key}>{el.letter}</div>
						<div className={cls.blocks__cards}>{
							topCompanies.map((card, card_idx) =>
								<CompanyCard mask={false} {...card} key={card_idx} />
							)
						}</div>
					</div>)}

				</div>
			</div>

		</div>
	</>)
}

export default Companies;