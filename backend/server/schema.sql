-- Solwise CMS — run this in Hostinger phpMyAdmin (database: u621362592_soulw)
-- Import via phpMyAdmin → Import, or paste into SQL tab and click Go.

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS `blogs` (
  `id` CHAR(36) NOT NULL,
  `slug` VARCHAR(160) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `excerpt` TEXT NULL,
  `content` LONGTEXT NULL,
  `category` VARCHAR(120) NOT NULL DEFAULT 'General',
  `tags` TEXT NULL,
  `author` VARCHAR(120) NOT NULL DEFAULT 'Dr. Sachin Bansal',
  `status` ENUM('draft','published') NOT NULL DEFAULT 'draft',
  `image` VARCHAR(700) NULL,
  `image_public_id` VARCHAR(255) NULL,
  `read_time` VARCHAR(40) NULL,
  `is_popular` TINYINT(1) NOT NULL DEFAULT 0,
  `allow_comments` TINYINT(1) NOT NULL DEFAULT 1,
  `meta_title` VARCHAR(255) NULL,
  `meta_description` TEXT NULL,
  `faqs` MEDIUMTEXT NULL,
  `publish_date` DATE NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_blogs_slug` (`slug`),
  KEY `idx_blogs_status` (`status`),
  KEY `idx_blogs_category` (`category`),
  KEY `idx_blogs_publish` (`publish_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `comments` (
  `id` CHAR(36) NOT NULL,
  `post_slug` VARCHAR(160) NOT NULL,
  `post_id` CHAR(36) NULL,
  `parent_id` CHAR(36) NULL,
  `author_name` VARCHAR(80) NOT NULL,
  `author_email` VARCHAR(120) NULL,
  `content` TEXT NOT NULL,
  `status` ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_comments_post` (`post_slug`),
  KEY `idx_comments_status` (`status`),
  KEY `idx_comments_parent` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `gallery` (
  `id` CHAR(36) NOT NULL,
  `url` VARCHAR(700) NOT NULL,
  `public_id` VARCHAR(255) NULL,
  `alt` VARCHAR(255) NULL,
  `category` VARCHAR(80) NOT NULL DEFAULT 'Events',
  `tall` TINYINT(1) NOT NULL DEFAULT 0,
  `sort_order` INT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_gallery_category` (`category`),
  KEY `idx_gallery_sort` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `events` (
  `id` CHAR(36) NOT NULL,
  `slug` VARCHAR(160) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `category` VARCHAR(80) NOT NULL DEFAULT 'Workshop',
  `status` ENUM('draft','published') NOT NULL DEFAULT 'draft',
  `event_date` DATE NOT NULL,
  `end_date` DATE NULL,
  `start_time` VARCHAR(40) NULL,
  `end_time` VARCHAR(40) NULL,
  `location` VARCHAR(255) NULL,
  `price` VARCHAR(80) NULL,
  `image` VARCHAR(700) NULL,
  `image_public_id` VARCHAR(255) NULL,
  `booking_url` VARCHAR(500) NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_events_slug` (`slug`),
  KEY `idx_events_status` (`status`),
  KEY `idx_events_date` (`event_date`),
  KEY `idx_events_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

-- If events table was created with mixed collation on Hostinger, run once:
-- ALTER TABLE `events` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
