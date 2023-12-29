import { Helmet } from 'react-helmet-async';
import { useCookies } from 'react-cookie';
import { Button, Checkbox, Modal, useModal } from '@geist-ui/react';
import { Trash2 } from '@geist-ui/icons';

import './css/App.css';
import './css/setting.css';
import { input_format } from './func/user_input';
import { cookie_date } from './variable/cookie';

const cookie_list = ['user_number', 'class_count', 'year_in', 'month_in'];

const Setting = () => {
	const [cookie, setCookie, removeCookie] = useCookies(cookie_list);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { visible: _a, setVisible, bindings } = useModal();

	return (
		<>
			<Helmet>
				<title>School Hit - Setting</title>
			</Helmet>

			<h1>Setting</h1>

			<h2>クラスの設定</h2>

			<label htmlFor='user_number'>あなたの出席番号</label>
			<input
				type='number'
				id='user_number'
				value={cookie.user_number}
				min={1}
				max={Number(cookie.class_count ?? 3776)}
				disabled={cookie.class_count === undefined}
				onChange={(event) =>
					setCookie('user_number', event.target.value, {
						maxAge: cookie_date,
					})
				}
			/>

			<br />

			<label htmlFor='class_count'>クラスの人数</label>
			<input
				type='number'
				id='class_count'
				value={cookie.class_count}
				min={1}
				max={100}
				onChange={(event) => {
					setCookie('class_count', event.target.value, {
						maxAge: cookie_date,
					});
					setCookie(
						'user_number',
						input_format(
							Number(cookie.user_number),
							1,
							Number(event.target.value),
							true
						)
					);
				}}
			/>

			<br />

			<h2>初期値の設定</h2>

			<div className='init_settings'>
				<Checkbox
					id='year_in'
					checked={cookie.year_in}
					onChange={(event) =>
						setCookie('year_in', event.target.checked, {
							maxAge: cookie_date,
						})
					}
				>
					年を含む
				</Checkbox>

				<Checkbox
					id='month_in'
					checked={cookie.month_in}
					onChange={(event) =>
						setCookie('month_in', event.target.checked, {
							maxAge: cookie_date,
						})
					}
				>
					月を含む
				</Checkbox>
			</div>

			<br />

			<Button
				auto
				icon={<Trash2></Trash2>}
				type='error'
				ghost
				onClick={() => {
					setVisible(true);
				}}
				placeholder={undefined}
			>
				設定をリセット
			</Button>

			<Modal {...bindings}>
				<Modal.Title>確認</Modal.Title>
				<Modal.Subtitle>この動作は取り消せません。</Modal.Subtitle>
				<Modal.Content>
					<p>
						設定(Cookie)は全て削除されます。 本当によろしいですか?
					</p>
				</Modal.Content>
				<Modal.Action
					passive
					onClick={() => setVisible(false)}
					placeholder={undefined}
				>
					キャンセル
				</Modal.Action>
				<Modal.Action
					type='error'
					onClick={() => {
						for (let i = 0; i < cookie_list.length; ++i) {
							removeCookie(cookie_list[i]);
						}
						location.href = '/school-hits/';
					}}
					placeholder={undefined}
				>
					続行
				</Modal.Action>
			</Modal>
		</>
	);
};

export default Setting;
