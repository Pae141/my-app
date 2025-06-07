import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';

export default function Layout({ children, setUser }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header fixed ด้านบน */}
       <Header user={user} setUser={setUser} />
      {/* spacer เพื่อดันทุกอย่างลงมาไม่ให้ทับ Header */}
      <div className="h-8" /> {/* ให้เท่ากับความสูงของ Header เช่น h-16 = 64px */}

      <Nav />

      <main className="flex-grow bg-gray-100 w-full">
        {children}
      </main>

      <Footer />
    </div>
  );
}
