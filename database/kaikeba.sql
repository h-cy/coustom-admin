/*
Navicat MySQL Data Transfer

Source Server         : root
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : kaikeba

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2018-11-21 10:57:10
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `open_course`
-- ----------------------------
DROP TABLE IF EXISTS `open_course`;
CREATE TABLE `open_course` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `description` varchar(500) CHARACTER SET utf8 NOT NULL,
  `time` datetime NOT NULL,
  `poster` varchar(255) NOT NULL,
  `count` int(11) NOT NULL COMMENT 'opencourse',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of open_course
-- ----------------------------
INSERT INTO `open_course` VALUES ('1', '使用深度学习算法进行文本挖掘', '使用深度学习算法进行文本挖掘', '2018-11-20 00:00:00', 'web_menu.png', '2');

-- ----------------------------
-- Table structure for `vip_course`
-- ----------------------------
DROP TABLE IF EXISTS `vip_course`;
CREATE TABLE `vip_course` (
  `id` int(20) NOT NULL,
  `url` varchar(256) NOT NULL,
  `icon` varchar(256) NOT NULL,
  `name` varchar(256) CHARACTER SET utf8 NOT NULL,
  `desc` text CHARACTER SET utf8 NOT NULL,
  `cooperation` varchar(512) NOT NULL,
  `poster` varchar(256) NOT NULL DEFAULT '' COMMENT 'vip表',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of vip_course
-- ----------------------------
INSERT INTO `vip_course` VALUES ('1', '/vip-course/web', 'https://img.kaikeba.com/web_menu.png', 'WEB全栈架构师', 'WEB全栈架构师授课深度对标百度，。。。。。。。。。。。。', 'https://img.kaikeba.com/baidu.png', 'https://img.kaikeba.com/web_vip.png');
INSERT INTO `vip_course` VALUES ('2', '/vip-course/python', 'https://img.kaikeba.com/web_menu.png', 'python爬虫', 'python爬虫授课深度对标百度，。。。。。。。。。。。。', 'https://img.kaikeba.com/baidu.png', 'https://img.kaikeba.com/web_vip.png');
