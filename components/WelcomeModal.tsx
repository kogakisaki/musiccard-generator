
import React, { useState, useEffect } from 'react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  // Trạng thái cục bộ để điều khiển các lớp hoạt ảnh, cho phép hoạt ảnh thoát
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Khi cửa sổ được đặt để mở, kích hoạt hoạt ảnh vào sau một khoảng trễ ngắn.
      // Điều này đảm bảo thành phần được gắn vào DOM và sẵn sàng cho quá trình chuyển đổi.
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    // Kích hoạt hoạt ảnh thoát trước
    setIsVisible(false);
    // Sau đó, sau khoảng thời gian của hoạt ảnh, gọi hàm onClose của thành phần cha để gỡ bỏ thành phần
    setTimeout(() => {
      onClose();
    }, 300); // Khoảng thời gian này phải khớp với thời gian chuyển đổi của CSS
  };

  // Thành phần sẽ không được hiển thị nếu isOpen là false từ thành phần cha
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      aria-modal="true"
      role="dialog"
      onClick={handleClose} // Cho phép đóng bằng cách nhấp vào nền
    >
      <div 
        className={`relative bg-[#1d2a23] text-white p-8 rounded-2xl shadow-xl max-w-lg w-11/12 mx-auto border border-gray-700 transition-all duration-300 ease-out transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        onClick={(e) => e.stopPropagation()} // Ngăn việc đóng khi nhấp vào bên trong cửa sổ
      >
        <h2 className="text-2xl font-bold mb-4 text-[var(--player-accent-color)]">Chào mừng bạn đến với Trình tạo thẻ nhạc!</h2>
        <p className="text-gray-300 mb-6">Đây là hướng dẫn nhanh để giúp bạn bắt đầu:</p>
        <ul className="space-y-4 text-gray-200">
          <li className="flex items-start">
            <span className="text-[var(--player-accent-color)] mr-3 text-2xl leading-none">•</span>
            <div>
              <strong className="font-semibold">Chỉnh sửa văn bản:</strong> Chỉ cần nhấp vào các mục văn bản như tiêu đề bài hát hoặc tên nghệ sĩ để thay đổi nội dung của chúng.
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-[var(--player-accent-color)] mr-3 text-2xl leading-none">•</span>
            <div>
              <strong className="font-semibold">Thay đổi ảnh bìa album:</strong> Di chuột qua ảnh bìa album và nhấp để tải lên hình ảnh của riêng bạn.
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-[var(--player-accent-color)] mr-3 text-2xl leading-none">•</span>
            <div>
              <strong className="font-semibold">Tùy chỉnh màu sắc:</strong> Sử dụng bộ chọn màu ở phía dưới để thay đổi màu nhấn của các nút điều khiển. Nền sẽ tự động điều chỉnh.
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-[var(--player-accent-color)] mr-3 text-2xl leading-none">•</span>
            <div>
              <strong className="font-semibold">Tải xuống tác phẩm của bạn:</strong> Khi bạn hài lòng, hãy nhấp vào nút "Tải thẻ nhạc dưới dạng ảnh" để lưu thẻ của bạn.
            </div>
          </li>
        </ul>
        <button
          onClick={handleClose}
          className="mt-8 w-full px-6 py-3 download-button-bg text-[#141f18] font-bold rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
          aria-label="Close welcome message"
        >
          Bắt đầu nào!
        </button>
      </div>
    </div>
  );
};
