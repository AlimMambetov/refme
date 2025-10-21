'use client'
import React from 'react';
import cls from './style.module.scss';
import dynamic from 'next/dynamic';
import { FAQMainBlock } from '@/templates';
import Accordion from '@/components/Accordion.component';
import { useIsDesktop } from '@/hooks';

export const FAQ = (props: any) => {
	const isDesktop = useIsDesktop();

	return (<><div className={cls.wrap}>
		<FAQMainBlock />
		<div data-desktop={isDesktop} className={`${cls.content} container`}>
			<div className={cls.content__block}>
				<Accordion title="What is RefMe? " text={`RefMe is a community-powered platform that helps people share and discover  referral codes from their favorite brands. Instead of searching all over the internet,  you can find verified referral codes and earn rewards — all in one place.`} />
				<Accordion title="How does it work?" text={`Simple:\n\n
				<ol>
					<li>Create a free profile or log in.</li>
					<li>Browse or search for the company you’re interested in.</li>
					<li>Copy a referral code and redeem it on that company’s website or app.</li>
					<li>Share your own referral codes and earn rewards when others use them!</li>
				</ol>`} />
				<Accordion title="Is it free to use? " text={`Yes! Browsing, sharing, and redeeming referral codes on RefMe is 100% free.`} />
				<Accordion title="How do I share my referral code?" text={`Once logged in, visit the company’s page and click <b>“Share Code.”</b>  Add your code, include any notes (like “£10 off your first order” or “works  worldwide”), and hit submit. Your code will appear on the company’s page for others  to see.`} />
				<Accordion title="How do I redeem a referral code?" text={`Click <b>“Copy Code”</b> next to the offer you like, then use it during signup or checkout on the company’s official website/app.`} />
				<Accordion title="Do I get rewards for sharing my referral code?" text={`Yes — whenever someone uses your code successfully, the company will reward  you directly according to their referral program. RefMe just connects sharers and  users — we don’t issue rewards ourselves.`} />
				<Accordion title="Why do I need to create a profile?" text={`Your profile lets you:\n\n
					<ol>
						<li>Manage and track your referral codes</li>
						<li>See how many times your codes were used</li>
						<li>Earn reputation points or badges</li>
						<li>Edit or delete codes anytime</li>
						<li>Upvote or report other users’ codes</li>
					</ol>
					`} />
				<Accordion title="How do I create an account?" text={`Click <b>“Sign Up”</b> at the top of the page and register using your email or social login (Google, Apple). It only takes a few seconds.`} />
				<Accordion title="How do I contact support?" text={`You can reach us anytime at support@refme.io or through the Help section in your profile.`} />
				<Accordion title="Do codes ever expire?" text={`Yes — some do. Expiration depends on the company’s policy. Check the notes users leave on each code or upvote those that still work.`} />
			</div>
			<div className={cls.content__block}>
				<Accordion title="Can I use the platform without signing up?" text={`Yes — you can browse without an account. But to <b>share, use codes, vote,</b> or <b>save favorites</b>, you’ll need to log in. `} />
				<Accordion title="Can I edit or remove my code?" text={`Yes. Go to your profile → “My Codes” → select the one you want to edit or delete.`} />
				<Accordion title="What’s the “Top Companies” section?" text={`It’s where you’ll find the most popular brands on the platform — ranked by the number of active codes, engagement, and community votes.`} />
				<Accordion title="What if the company I want isn’t listed?" text={`Click <b>“Request a Company”</b> on the homepage. Once verified, we’ll add it to the database so you (and others) can share codes there. `} />
				<Accordion title="How are codes ranked or sorted?" text={`Codes shown to the users are randomised, users can display codes ranked by a mix of factors like user votes, recent activity, and success rate. `} />
				<Accordion title="Are all referral codes verified?" text={`Our community helps keep the platform clean — users can upvote working codes and <b>report</b> expired or invalid ones. Our moderation team also reviews reports regularly.`} />
				<Accordion title="Is it safe to share my referral code?" text={`Yes. Just make sure you only share the referral code itself, not personal or account information. We automatically hide anything that looks unsafe.`} />
				<Accordion title="Will my profile be public?" text={`You can choose what’s visible on your profile — only your username and shared codes are shown by default.`} />
				<Accordion title="What kinds of companies can I find here?" text={`We feature everything from fintech and delivery apps to fashion, travel, crypto, and subscription services. If a brand offers referral bonuses, you’ll probably find it here.`} />
			</div>
		</div>
	</div></>)
}

export default FAQ;