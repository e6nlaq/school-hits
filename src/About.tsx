import { Link } from 'react-router-dom';
import { Button } from '@geist-ui/react';
import { Github, FileText } from '@geist-ui/icons';

import './css/about.css';

const About = () => {
	return (
		<>
			<h1>About</h1>

			<h2>使い方</h2>
			<div className='about'>
				<p>
					1. (初回のみ) <Link to='/setting'>Settingタブ</Link>
					から設定をする
				</p>
				<p>
					2. <Link to='/'>Homeタブ</Link>に飛び、
					チェックしたい日付を設定する
				</p>
				<p>3. Checkボタンを押して実行!</p>
			</div>

			<p>※結果は数が小さいほど危険という意味です。</p>

			<br />

			<h2>外部リンク</h2>

			<Button
				icon={<Github />}
				type='secondary'
				auto
				ghost
				placeholder={undefined}
				onClick={() => open('https://github.com/e6nlaq/school-hits')}
				className='link'
				style={{ margin: '5px' }}
			>
				GitHub
			</Button>

			<Button
				type='success'
				auto
				ghost
				placeholder={undefined}
				style={{ margin: '5px' }}
				icon={<FileText />}
				onClick={() =>
					open(
						'https://github.com/e6nlaq/school-hits/blob/main/LICENSE'
					)
				}
			>
				License
			</Button>
		</>
	);
};

export default About;
