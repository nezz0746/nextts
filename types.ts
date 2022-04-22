export type Launch = {
  id: string
  mission_name: string
  launch_date_local: string
  launch_site: LaunchSite
  links: Links
  rocket: Rocket
  ships: Ship[]
  details: string
}

export type Rocket = {
  rocket_name: string
  first_state: FirstStage
  second_stage: SecondStage
}

export type Links = {
  article_link: string
  mission_patch: string
  video_link: string
}

export type LaunchSite = {
  site_name_long: string
}

export type FirstStage = {
  cores: {
    flight: string
    core: {
      reuse_count: number
      status: string
    }
  }
}

export type SecondStage = {
  payloads: Payload[]
}

export type Payload = {
  payload_type: string
  payload_mass_kg: number
  payload_mass_lbs: number
}

export type Ship = {
  name: string
  home_port: string
  image: string
}
