import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
	const { pathname } = useLocation(); // Lấy đường dẫn hiện tại

	useEffect(() => {
		window.scrollTo(0, 0); // Cuộn lên trên cùng của trang
	}, [pathname]); // Mỗi khi pathname thay đổi, effect sẽ được gọi

	return null;
};

export default ScrollToTop;
