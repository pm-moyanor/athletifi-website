import Link from "next/link";


const Header = () => {
    return (
        <>
            <Link href="/">
                Home
            </Link>
            <Link href="/about">
                About
            </Link>
            <Link href="/mint">
                Mint
            </Link>
        </>
    )
}

export default Header;