import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

interface Announcement {
  title: string;
  description: string;
  topic: string;
  notificationStatus: string;
  senderEmail: string;
  createdAt: string;
}

interface NotificationPopupProps {
  visible: boolean;
  announcement: Announcement;
  onClose: () => void;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({ visible, announcement, onClose }) => {
  const handleContainerPress = () => {
    if (visible) {
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent>
      <TouchableOpacity activeOpacity={1} style={styles.container} onPress={handleContainerPress}>
        <View style={styles.popup}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>❌</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{announcement.title}</Text>
          <Text style={styles.description}>{announcement.description}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.detail}>Topic: {announcement.topic}</Text>
            <Text style={styles.detail}>From: {announcement.senderEmail}</Text>
            <Text style={styles.detail}>Status: {announcement.notificationStatus}</Text>
            <Text style={styles.detail}>Time: {new Date(announcement.createdAt).toLocaleString()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    color: '#333',
  },
  description: {
    marginBottom: 15,
    color: '#666',
  },
  detailsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  detail: {
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 5,
  },
});

export default NotificationPopup;
