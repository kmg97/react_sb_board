import React, {createContext, useContext, useState} from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

// 전역적으로 user 정보를 관리할 context
// Context 내부에서 State로 관리되는 user 정보를 조회해서 필터링 할 것
export function AuthProvider({ children }) {
    // 새로 고침시 Context가 초기화 되므로 유저 정보를 sessionStorage에 저장
    // 초기값으로 sessionStorage 조회 후 초기화
    const initialToken = JSON.parse(sessionStorage.getItem('token'))
    const [user, setUser] = useState(initialToken);


    // 로그인 함수
    const login = (userData) => {
        setUser(userData);
        sessionStorage.setItem("token", JSON.stringify(userData));
    };

    // 로그아웃 함수
    const logout = () => {
        setUser(null);
        sessionStorage.removeItem("token");
        // 새로고침 (아직 미정)
        // window.location.reload();
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}