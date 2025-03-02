import SkillsHeader from './SkillsHeader'
import SkillsBody from './SkillsBody'







const Skills = ({preloader, alertNotification}) => {
  return (
    <div className="dashboard-banner-container">
      <SkillsHeader preloader={preloader} alertNotification={alertNotification}/>
      <SkillsBody preloader={preloader} alertNotification={alertNotification}/>
    </div>
  )
}

export default Skills
