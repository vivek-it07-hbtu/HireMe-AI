import { Download, Github, Menu, Moon, Sun } from 'lucide-react'
import { resumeDownloadUrl } from '../services/api'
export function Logo() { return <button className="logo" onClick={() => location.hash = '#/chat'} aria-label="HireMe AI chat"><span>H</span>HireMe AI</button> }
export default function Navbar({ dark, toggleDark, openMenu }: { dark: boolean; toggleDark: () => void; openMenu?: () => void }) {
  return <header className="navbar"><div className="nav-inner"><div className="nav-brand"><button className="mobile-menu icon-button" onClick={openMenu} aria-label="Open navigation menu"><Menu size={20}/></button><Logo /></div><div className="nav-actions"><a className="resume-link" href={resumeDownloadUrl} aria-label="Download Vivek Chaudhary's resume"><Download size={16}/><span>Resume</span></a><button className="icon-button" onClick={toggleDark} aria-label="Toggle colour theme">{dark ? <Sun size={19}/> : <Moon size={19}/>}</button><a className="icon-button" href="https://github.com/vivek-it07-hbtu/HireMe-AI" target="_blank" rel="noreferrer" aria-label="View HireMe AI on GitHub"><Github size={19}/></a></div></div></header>
}
