import { Link } from 'react-router-dom';
import { Button } from '@fluentui/react-components';
import { DeleteFilled, DocumentFilled } from '@fluentui/react-icons';

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

			<h2>外部リンク</h2>

			<Button
				icon={<DeleteFilled />}
				onClick={() => open('https://github.com/e6nlaq/school-hits')}
				className='link'
				style={{ margin: '5px' }}
			>
				GitHub
			</Button>

			<Button
				style={{ margin: '5px' }}
				icon={<DocumentFilled />}
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
